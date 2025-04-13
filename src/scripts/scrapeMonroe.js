// scripts/scrapeMonroe.js
import axios from 'axios';
import * as cheerio from 'cheerio';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const URL = "https://www.city-data.com/accidents/acc-Monroe-Louisiana.html";

async function scrapeAndUpload() {
  try {
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);

    // Extract crash stats
    const stats = [];
    $('table tbody tr').each((i, row) => {
      const cols = $(row).find('td');
      if (cols.length >= 4) {
        stats.push({
          year: parseInt($(cols[0]).text().trim()),
          fatal_accidents: parseInt($(cols[1]).text().trim()),
          fatalities: parseInt($(cols[2]).text().trim()),
          pedestrian_fatalities: parseInt($(cols[3]).text().trim())
        });
      }
    });

    // Extract light and weather conditions
    const conditions = {
      light: {
        daylight: $('td:contains("Daylight")').next().text().trim(),
        dark_not_lighted: $('td:contains("Dark – Not Lighted")').next().text().trim(),
        dark_lighted: $('td:contains("Dark – Lighted")').next().text().trim(),
      },
      weather: {
        clear: $('td:contains("Clear")').next().text().trim(),
        unknown: $('td:contains("Unknown")').next().text().trim(),
      }
    };

    // EMS response times
    const ems = {
      monroe_response_time_min: parseFloat($('td:contains("Monroe EMS response")').next().text().trim()),
      ouachita_response_time_min: parseFloat($('td:contains("Ouachita EMS response")').next().text().trim()),
      la_response_time_min: parseFloat($('td:contains("Louisiana EMS response")').next().text().trim())
    };

    // Hospital transport times
    const transport = {
      monroe_transport_time_min: parseFloat($('td:contains("Monroe Transport")').next().text().trim()),
      ouachita_transport_time_min: parseFloat($('td:contains("Ouachita Transport")').next().text().trim()),
      la_transport_time_min: parseFloat($('td:contains("Louisiana Transport")').next().text().trim())
    };

    const crashData = {
      location: "Monroe, LA",
      crash_stats: stats,
      conditions,
      ems,
      transport,
      source: URL,
      uploaded_at: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('city_crash_stats').doc('monroe_scraped').set(crashData);
    console.log("✅ Crash data scraped and uploaded to Firestore.");

  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

scrapeAndUpload();

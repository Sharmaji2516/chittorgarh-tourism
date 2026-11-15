import fs from 'fs';

const API_KEY = '887c5df342e941df9f516a8ab6a5d7e5';
const HOST = 'www.visitchittorgarh.in';
const KEY_LOCATION = `https://${HOST}/${API_KEY}.txt`;

async function submitIndexNow() {
  console.log('🚀 Reading sitemap URLs from dist/sitemap.xml...');
  const sitemapContent = fs.readFileSync('dist/sitemap.xml', 'utf8');
  const urls = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

  console.log(`📍 Found ${urls.length} indexable URLs to submit to Bing & IndexNow.`);

  const payload = {
    host: HOST,
    key: API_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const endpoints = [
    { name: 'IndexNow Central API', url: 'https://api.indexnow.org/indexnow' },
    { name: 'Bing IndexNow Direct', url: 'https://www.bing.com/indexnow' },
  ];

  for (const ep of endpoints) {
    console.log(`\n📡 Submitting ${urls.length} URLs to ${ep.name}...`);
    try {
      const response = await fetch(ep.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      console.log(`✅ ${ep.name} Status: ${response.status} ${response.statusText}`);
      if (response.status === 200) {
        console.log(`🎉 Successfully indexed ${urls.length} URLs on ${ep.name}!`);
      } else if (response.status === 202) {
        console.log(`⏳ Key submission accepted (${response.status}). IndexNow will verify key at ${KEY_LOCATION} and crawl.`);
      } else {
        const text = await response.text();
        console.log(`⚠️ Response body:`, text);
      }
    } catch (err) {
      console.error(`❌ Error submitting to ${ep.name}:`, err.message);
    }
  }

  console.log('\n🏁 IndexNow submission job completed.');
}

submitIndexNow().catch(console.error);


const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

// https://shop.mplus.ge/products/2652?lang=2
const url = 'https://shop.mplus.ge/products/'
const articles = [6523, 6522, 6428, 5937, 5935, 5934, 5933, 5862, 5650, 5582, 5580, 5578, 5577, 5576, 5384, 5383, 5348, 5197, 5168, 4654, 4628, 4627, 4617, 4616, 4615, 4614, 4173, 4172, 4171, 4170, 4169, 4118, 4102, 4103, 4106, 4040, 3992, 3974, 3638, 3589, 3587, 3583, 3582, 3537, 3536, 3527, 3526, 3525, 3524, 3154, 3155, 3153, 3152, 3151, 2860, 2846, 2820, 2819, 2815, 2814, 2813, 2812, 2811, 2810, 2809, 2807, 2806, 2805, 2801, 2799, 2798, 2797, 2791, 2792, 2793, 2787, 2789, 2790, 2786, 2783, 2782, 2779, 2777, 2776, 2774, 2773, 2770, 2771, 2769, 2763, 2766, 2767, 2760, 2761, 2759, 2757, 2752, 2751, 2749, 2745, 2742, 2741, 2738, 2739, 2737, 2736, 2735, 2727, 2729, 2730, 2725, 2713, 2707, 2710, 2706, 2705, 2704, 2691, 2689, 2690, 2688, 2684, 2683, 2682, 2677, 2665, 2662, 2655, 2652, 2654, 2647, 2650, 2645, 2640, 2641, 2643, 2639, 2638, 2634, 2633, 2632, 2631, 2625, 2623, 2620, 2619, 2615, 2614, 2494, 2613, 1938, 1941, 1935, 1936]


async function pageParser(url, code) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(url);
  const content = await page.content();
  const $ = cheerio.load(content);
  let name = $('.h3').text() 
  let price =  $('#prod_wrap > div > div > div.col-md-9 > span.text-lg.font-weight-bold.mr-2').text()
  let image = `https://shop.mplus.ge/${$('#prod_wrap > div > div > div.col-md-3.lightgallery > div:nth-child(1) > a > img').attr('src')}`
  let productCode = code
  browser.close();
  return {name, price, image, productCode} 
}
// let rawdata = fs.readFileSync(path.resolve(__dirname, 'data/data.json'));
// let data = JSON.parse(rawdata);
// console.log(data);


//опции для настройки пупитир
  
const LAUNCH_PUPPETEER_OPTS = {}


function arrayFromLength(number) {
  return Array.from(new Array(number).keys()).map(k => k + 1)
}

async function getPageContent(url) {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(url)
      const content = await page.content()
      browser.close()
      return content
}


// let pageArr = [6523, 6522, 6428,]

async function main() {
    try {
      let pageArr = [6523, 6522, 6428, 5937, 5935, 5934, 5933, 5862, 5650, 5582, 5580, 5578, 5577, 5576, 5384, 5383, 5348, 5197, 5168, 4654, 4628, 4627, 4617, 4616, 4615, 4614, 4173, 4172, 4171, 4170, 4169, 4118, 4102, 4103, 4106, 4040, 3992, 3974, 3638, 3589, 3587, 3583, 3582, 3537, 3536, 3527, 3526, 3525, 3524, 3154, 3155, 3153, 3152, 3151, 2860, 2846, 2820, 2819, 2815, 2814, 2813, 2812, 2811, 2810, 2809, 2807, 2806, 2805, 2801, 2799, 2798, 2797, 2791, 2792, 2793, 2787, 2789, 2790, 2786, 2783, 2782, 2779, 2777, 2776, 2774, 2773, 2770, 2771, 2769, 2763, 2766, 2767, 2760, 2761, 2759, 2757, 2752, 2751, 2749, 2745, 2742, 2741, 2738, 2739, 2737, 2736, 2735, 2727, 2729, 2730, 2725, 2713, 2707, 2710, 2706, 2705, 2704, 2691, 2689, 2690, 2688, 2684, 2683, 2682, 2677, 2665, 2662, 2655, 2652, 2654, 2647, 2650, 2645, 2640, 2641, 2643, 2639, 2638, 2634, 2633, 2632, 2631, 2625, 2623, 2620, 2619, 2615, 2614, 2494, 2613, 1938, 1941, 1935, 1936]
      const goods = []
      let count = 0
      for (const page of pageArr) {
         const url = `https://shop.mplus.ge/products/${page}?lang=2`
         const pageContent = await getPageContent(url)
         const $ = cheerio.load(pageContent)
         let name = $('.h3').text()
         let price =  $('#prod_wrap > div > div > div.col-md-9 > span.text-lg.font-weight-bold.mr-2').text()
         let images = `https://shop.mplus.ge/${$('#prod_wrap > div > div > div.col-md-3.lightgallery > div:nth-child(1) > a > img').attr('src')}`
         let shortdescription = `${$('#prod_wrap > div > div > div.col-md-9 > p').text()}${$('#prod_wrap > div > div > div.col-md-9 > p:nth-child(9)').text()} ${$('#prod_wrap > div > div > div.col-md-9 > ul:nth-child(11)').text()}`
         let description = `${$('#prod_wrap > div > div > div.col-md-9 > p').text()}${$('#prod_wrap > div > div > div.col-md-9 > p:nth-child(9)').text()} ${$('#prod_wrap > div > div > div.col-md-9 > ul:nth-child(11)').text()}`
         let article = page
         count++
          goods.push({name, price, images, article, shortdescription, description, oldprice: 0, characteristics: '', catid: ''})
          console.log(`Page ${count} OK!`)
          
         
      }
      let data = JSON.stringify(goods);
      fs.writeFileSync(path.resolve(__dirname, 'data/goodsdescription.json'), data);

    } catch (err) {
      console.log(err)
    }
}

main()




// let rawdata = fs.readFileSync(path.resolve(__dirname, 'data/data.json'));
// let data = JSON.parse(rawdata);
// console.log(data);
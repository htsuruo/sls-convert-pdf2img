import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path'
// import * as Pdf2Image from './pdf2image'
import { usePixmap } from '@jeylabs/aws-lambda-poppler';

const END_POINT = process.env.END_POINT

export const s3hook = async (event, _context) => {
  const fm = new FileManager(event)
  const params: any = {
    Bucket: fm.bucketname,
    Key: 'imgs/' + 'thumbnail.pdf',
  }

  const hoge = usePixmap('/Users/tsuruoka/Desktop/test2.pdf', {
    root: '/tmp',
    prefix: 'modified',
    options: ['-png', '-freetype no']
  })
  console.log(hoge)

  // const v = fs.readFileSync(fm.url)
  const s3 = new AWS.S3({
    s3ForcePathStyle: true,
    endpoint: new AWS.Endpoint(END_POINT),
    accessKeyId: 'S3RVER',
    secretAccessKey: 'S3RVER',
  });
  // exec_pdf2image()
  // const v = fs.readFileSync(fm.original_path)
  // const v = fs.readFileSync('/Users/tsuruoka/Desktop/test2.pdf')
  // const pdf2image = new Pdf2Image('/Users/tsuruoka/Desktop/test2.pdf')

  // const v = pdfjs.getDocument({ url: '/Users/tsuruoka/Desktop/test2.pdf' })
  // params.Body = v
  // console.log(params)
  // s3.upload(params, function(err, data) {
  //     if(err) {
  //         console.log('error : ', err);
  //     } else {
  //         console.log('success : ' + data);
  //     }
  // });
}

// async function exec_pdf2image() {
//   const pdf2image = await Pdf2Image.open('/Users/tsuruoka/Desktop/test2.pdf')
//   const images = await pdf2image.getAllImageDataUrl({ width: 400, height: 400 });
//   console.log(images)
// }

// class Pdf2Image {
//   /**
//    * @param {string} pdfUrl PDFのURL
//    * @return {Pdf2Image} Pdf2Imageのインスタンスを返す
//    */
//   pdfDoc: string
//   static async open(pdfUrl) {
//     const pdfDoc = await PDFJS.getDocument({ url: pdfUrl }).promise;
//     return new Pdf2Image(pdfDoc);
//   }
//   /**
//    * @param {PDFJS.PDFDocumentProxy} pdfDoc
//    */
//   constructor(pdfDoc) {
//     this.pdfDoc = pdfDoc;
//   }

//     /**
//    * @return {Number} ページ数
//    */
//   numPages() {
//     return this.pdfDoc._pdfInfo.numPages;
//   }

//   /**
//    * PDFの指定ページを画像にし、画像のDataUrlを返す
//    * @param {Number} pageNo ページ番号(1〜)
//    * @param {Object} option
//    *                  {scale:画像の倍率}, 画像を指定した倍率で拡大する
//    *                  {width:最大幅, height:最大高さ} 画像を指定した領域に収まるサイズにする
//    *                  {image:'jpeg|webp|png|'} 画像フォーマット
//    * @return {String} ページ画像のDataUrl
//    */
//   async getImageDataUrl(pageNo, option) {
//     const page = await this.pdfDoc.getPage(pageNo);
//     const scale = Pdf2Image.calcScale(page, option);
//     const viewport = page.getViewport({ scale });
//     const canvas = document.createElement('canvas');
//     const canvasContext = canvas.getContext('2d');
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;
//     canvasContext.height = viewport.height;
//     canvasContext.width = viewport.width;

//     const renderContext = {
//       canvasContext,
//       viewport,
//     };
//     await page.render(renderContext).promise;
//     switch (option.image) {
//       case 'jpeg':
//         return canvas.toDataURL('image/jpeg');
//       case 'webp':
//         return canvas.toDataURL('image/webp');
//       default:
//         return canvas.toDataURL();
//     }
//   }

//   /**
//    *
//    * @param {PDFJS.PDFPageProxy} page
//    * @param {Object} option
//    *                  {scale:画像の倍率}, 画像を指定した倍率で拡大する
//    *                  {width:最大幅, height:最大高さ} 画像を指定した領域に収まるサイズにする
//    * @return {Number} 倍率
//    */
//   static calcScale(page, option) {
//     if (option.scale !== undefined) {
//       return option.scale;
//     }
//     if (option.width === undefined || option.height === undefined) {
//       return 1.0;
//     }
//     const viewport = page.getViewport({ scale: 1.0 });
//     return Math.min(option.width / viewport.width, option.height / viewport.height);
//   }

//   /**
//    * PDFのすべてのページを画像にし、画像のDataUrlを返す
//    * @param {Object} option
//    *                  {scale:画像の倍率}, 画像を指定した倍率で拡大する
//    *                  {width:最大幅, height:最大高さ} 画像を指定した領域に収まるサイズにする
//    * @return {String[]} ページ画像のDataUrl
//    */
//   async getAllImageDataUrl(option) {
//     const pages = [];
//     const numPages = this.numPages();
//     for (let i = 1; i <= numPages; i += 1) {
//       const img = await this.getImageDataUrl(i, option);
//       pages.push(img);
//     }
//     return pages;
//   }
// }


class FileManager {

  bucketname: string
  key: string
  filename: string
  original_path: string

  constructor(event) {
    this.bucketname = event.Records[0].s3.bucket.name
    this.key = event.Records[0].s3.object.key
    this.original_path = `${END_POINT}${this.bucketname}/${this.key}`
    this.filename = path.basename(this.key);
    console.log(`original_path: ${this.original_path}`)
    console.log(`bucketname: ${this.bucketname}, key: ${this.key}, filename: ${this.filename}`)
  }
}

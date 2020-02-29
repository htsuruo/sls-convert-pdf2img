import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';
// import pdfjs from 'pdfjs-dist';

export const s3hook = async (event, _context) => {
  const fm = new FileManager(event)
  const params: any = {
    Bucket: 'local-bucket',
    Key: fm.key_without_filename + 'thumbnail.pdf',
  }
  // const v = fs.readFileSync(fm.url)
  // const v = pdfjs.getDocument({ url: fm.url })
  // params.Body = v
  // S3.putObject(params, function(err,data) {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //     console.log(data);
  //   }
  // });
}


class FileManager {

  HOST = '/Users/tsuruoka/github/sls-convert-pdf2img/s3-local'
  bucketname: string
  key: string
  url: string
  filename: string
  key_without_filename: string

  constructor(event) {
    this.bucketname = event.Records[0].s3.bucket.name
    this.key = event.Records[0].s3.object.key
    console.log(`bucketname: ${this.bucketname}, key: ${this.key}`)
    this.url = `${this.HOST}/${this.bucketname}/${this.key}`
    console.log(this.url)
    this._split_filename()
  }

  _split_filename() {
    const keyarr = this.key.split('/')
    this.filename = keyarr.pop()
    this.key_without_filename = keyarr.join('/') + '/'
    console.log(`filename: ${this.filename}, target_dir: ${this.key_without_filename}`)
  }
}

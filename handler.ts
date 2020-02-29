import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
// import S3 from 'aws-sdk/clients/s3';
import AWS from 'aws-sdk';
import fs from 'fs';
// import pdfjs from 'pdfjs-dist';

const END_POINT = 'http://localhost:8000'

export const s3hook = async (event, _context) => {
  const fm = new FileManager(event)
  const params: any = {
    Bucket: fm.bucketname,
    Key: 'imgs/' + 'thumbnail.pdf',
  }

  // const v = fs.readFileSync(fm.url)
  const s3 = new AWS.S3({
    s3ForcePathStyle: true,
    endpoint: new AWS.Endpoint(END_POINT),
    accessKeyId: 'S3RVER',
    secretAccessKey: 'S3RVER',
  });
  const v = fs.readFileSync('/Users/tsuruoka/Desktop/test2.pdf')
  // const v = pdfjs.getDocument({ url: fm.url })
  params.Body = v
  console.log(params)
  s3.upload(params, function(err, data) {
      if(err) {
          console.log('error : ', err);
      } else {
          console.log('success : ' + data);
      }
  });
}


class FileManager {

  bucketname: string
  key: string
  filename: string

  constructor(event) {
    this.bucketname = event.Records[0].s3.bucket.name
    this.key = event.Records[0].s3.object.key
    console.log(`bucketname: ${this.bucketname}, key: ${this.key}`)
    this._split_filename()
  }

  _split_filename() {
    const keyarr = this.key.split('/')
    this.filename = keyarr.pop()
    // this.key_without_filename = keyarr.join('/') + '/'
    console.log(`filename: ${this.filename}`)
  }
}

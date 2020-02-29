const aws = require('aws-sdk');
const s3 = new aws.S3();
const fs = require('fs')
// const pdf2image = require('./pdf2image')

// module.exports.webhook = (event, context, callback) => {
//   const S3 = new AWS.S3({
//     s3ForcePathStyle: true,
//     endpoint: new AWS.Endpoint('http://localhost:8000'),
//     accessKeyId: 'S3RVER',
//     secretAccessKey: 'S3RVER',
//   });
//   S3.putObject({
//     Bucket: 'local-bucket',
//     Key: 'docs/12345678',
//     Body: new Buffer('abcd'),
//   }, () => { callback(null, 'ok'); });
// };

const HOST = '/Users/tsuruoka/github/sls-convert-pdf2img/s3-local'

module.exports.s3hook = (event, context) => {
  const bucketname = event.Records[0].s3.bucket.name
  const key = event.Records[0].s3.object.key
  console.log(`bucketname: ${bucketname}, key: ${key}`)
  const url = `${HOST}/${bucketname}/${key}`
  console.log(url)

  const keyarr = key.split('/')
  const filename = keyarr.pop()
  const target_dir = keyarr.join('/') + '/'
  console.log(`filename: ${filename}, target_dir: ${target_dir}`)
  // console.log(JSON.stringify(context));
  // console.log(JSON.stringify(process.env));

  // const params = {
  //   Bucket: 'local-bucket',
  //   Key: target_dir + 'thumbnail.pdf',
  // }
  // const v = fs.readFileSync(url)
  // params.Body = v
  // s3.putObject(params, function(err, data) {
  //   if(err) {
  //     console.log(err)
  //   } else {
  //     console.log(data);
  //   }
  // });
  // S3.putObject({
  //   Bucket: 'local-bucket',
  //   Key: target_dir + 'thumbnail.pdf',
  //   Body: new Buffer('abcd'),
  // }, () => { callback(null, 'ok'); });
};

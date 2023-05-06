export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  database: {
    url: process.env.DATABASE_URL,
  },

  s3bucket: {
    name: process.env.S3BUCKET_NAME,
  },

  aws: {
    region: process.env.AWS_REGION,
    access_key: process.env.AWS_ACCESS_KEY_ID,
    secret_access_key: process.env.AWS_SECRET_ACCESS_KEY_ID
  }
});
# Amazon Web Services

We no longer support deploying to AWS. However, you can still use Amazon S3 for storage and Amazon SQS for the audit queue if you like.

## Environment Variables
| Variable | Description |
| :--- | :--- |
| `AWS_API_KEY` | The AWS API key. |
| `AWS_API_SECRET` | The AWS API secret. |
| `AWS_S3_BUCKET_NAME` | The name of the S3 bucket.  |
| `AWS_S3_REGION` | The region of the S3 bucket. Default is `us-west-2`. See a list of available [AWS Regions and Enpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region).  |
| `AWS_S3_VERSION` | The S3 API version. Default is `2006-03-01`. |
| `AWS_SQS_QUEUE_LH` | The name of the SQS queue for the Lighthouse Server. |
| `AWS_SQS_QUEUE_PHPCS` | The name of the SQS queue for the PHPCS Server. |
| `AWS_SQS_REGION` | The region of the SQS queue. Default is `us-west-2`. See a list of available [AWS Regions and Enpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html#sqs_region).  |
| `AWS_SQS_VERSION` | The SQS API version. Default is `2012-11-05`. |
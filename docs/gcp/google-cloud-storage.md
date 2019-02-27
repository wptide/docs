# Google Cloud Storage

If you want to upload Tide audit reports to GCS then you'll need to create a bucket for those reports. Open the [Cloud Storage Browser](https://console.cloud.google.com/storage/browser) and click **Create Bucket**.

## Environment Variables

| Variable | Description |
| :--- | :--- |
| `GCS_BUCKET_NAME` | The name of the GCS bucket. |

## Media Uploads

If you want to upload images to WordPress, then you'll need to create a bucket for those images to live (unless you opt to use the local file system). Open the [Cloud Storage Browser](https://console.cloud.google.com/storage/browser) and click **Create Bucket**.

Run the following command to change the ACL's of your new bucket:

```
$ gsutil defacl ch -u AllUsers:R gs://YOUR_BUCKET_NAME
```

When the API is up and running, log into the WordPress admin and go to the plugin settings page for `GCS Upload` then add your bucket name to the form field and click **Save Settings**.
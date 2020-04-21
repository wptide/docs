# Google Cloud Firestore

If you want to use Cloud Firestore as the database provider for the Sync Server or as the message provider for the Lighthouse/PHPCS Server you'll need to setup Cloud Firestore for your project.

## Environment Variables

| Variable | Description |
| :--- | :--- |
| `GCF_QUEUE_LH` | Specifies which collection in Cloud Firestore to use for the Lighthouse message queue. This is a Firestore collection **path**. Default is `queue-lighthouse`. |
| `GCF_QUEUE_PHPCS` | Specifies which collection in CLoud Firestore to use for the PHPCS message queue. This is a Firestore collection **path**. Default is `queue-phpcs`. |

## Setup

1. If you don't already have a Firebase project, add one in the [Firebase console](https://console.firebase.google.com/u/0/project/_/database/firestore/data). The **Add project** dialog also gives you the option to add Firebase to an existing Google Cloud Platform project.

1. Allow read/write access on all documents to any user signed in to the application by replacing the previous [security rules](https://console.firebase.google.com/u/0/project/_/database/firestore/rules) with the following in the Cloud Firestore console.

    ```
    service cloud.firestore {
        match /databases/{database}/documents {
            match /{document=**} {
                allow read, write: if request.auth.uid != null;
            }
        }
    }
    ```

1. In order for the message queue to be queryable by the Go servers, you will need to add composite indexes for both the `GCF_QUEUE_LH` and `GCF_QUEUE_PHPCS` message queues. The following directions are going to be for `GCF_QUEUE_PHPCS`, but must be repeated for the `GCF_QUEUE_LH` queue. It's assumed you are using the default `queue-phpcs` value for `GCF_QUEUE_PHPCS`.

    1. Open the [composite indexes](https://console.firebase.google.com/u/0/project/_/database/firestore/indexes) tab in the Firebase console.
    1. Click `Add index manually` or the `Add Index` button if you already have created a composite index.
    1. Add `queue-phpcs` as the collection name.
    1. Add a new field named `retry_available` and set sort to ascending.
    1. Add a new field named `lock` and set the sort to ascending.
    1. Add a new field named `created` and set the sort to ascending.
    1. Click `Create Index` and repeat for `queue-lighthouse`.

_Note: If you change the values in your `.env` then the collection names in the third step should be the same as those values._
import {
    S3Client,
    PutObjectCommand
} from '@aws-sdk/client-s3';
import fs from 'fs';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyID = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;

const client = new S3Client({
    region,
    credentials: {
        accessKeyId: accessKeyID,
        secretAccessKey: secretKey,
    },
});

export async function uploadFile(file, email) {
    const fileStream = fs.createReadStream(file.path);

    const uniqueId = uuidv4();
    const key = `Users/${email}/${uniqueId}-${file.filename}`;

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: key,
    };

    const command = new PutObjectCommand(uploadParams);

    try {
        const response = await client.send(command);
        // console.log('File uploaded successfully:', response);
        const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
        return url;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Error uploading file');
    }
}
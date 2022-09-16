import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import * as dbAccessor from './todosAcess';

const XAWS = AWSXRay.captureAWS(AWS)
const s3 = new XAWS.S3({ signatureVersion: 'v4' });

export async function createAttachmentPresignedUrl(userId: string, todoId: string) {
    const signedUrl = s3.getSignedUrl('putObject', {
        Bucket: process.env.ATTACHMENT_S3_BUCKET,
        Key: todoId,
        Expires: parseInt(process.env.SIGNED_URL_EXPIRATION)
    });
    
    await dbAccessor.addTodoImageUrl(userId, todoId);
    return signedUrl;
}

export async function deleteImage(todoId: string) {
    await s3.deleteObject({
        Bucket: process.env.ATTACHMENT_S3_BUCKET,
        Key: todoId,
    }).promise();
}
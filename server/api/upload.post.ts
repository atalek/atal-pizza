import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getServerSession } from '#auth'
import { v4 as uuid } from 'uuid'

export default defineEventHandler(async event => {
  const body = await readMultipartFormData(event)
  const session = await getServerSession(event)

  const s3Client = new S3Client({
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_SECRET as string,
    },
  })

  const file = body?.find(item => item.name === 'file')

  const ext = file?.filename?.split('.').pop()
  const newFileName = uuid() + '.' + ext
  const bucket = 'food-orderink'

  const res = await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: newFileName,
      ACL: 'public-read',
      ContentType: file!.type,
      Body: file!.data,
    })
  )

  if (res) {
    User.findOneAndUpdate(
      { email: session?.user?.email },
      { image: newFileName }
    ).exec()
  }

  return newFileName
})

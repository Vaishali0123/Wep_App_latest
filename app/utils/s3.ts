import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { fileKey } = req.query;

    if (!fileKey) {
      return res.status(400).json({ message: "File key is required" });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileKey as string,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 });

    res.status(200).json({ url });
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Replace with your S3 bucket URL or another source where the HTML files are stored
    const fileUrl = `https://d95e0jpum1wnk.cloudfront.net/aryansh.html`;

    res.status(200).json({ url: fileUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching HTML file" });
  }
}

# Clip Cloud - Social Video Sharing Platform

**Clip Cloud** is a social media platform inspired by TikTok, where users can upload, watch, and share short video clips. The app allows users to upload videos, add descriptions, and view content from other users. Built with React Native, Supabase, and S3 for video and image storage, Clip Cloud provides a seamless mobile experience for discovering and interacting with user-generated content.

## Features

- **User Authentication**: Sign up and login using Clerk authentication.
- **Video Upload**: Upload videos to the app, stored on AWS S3.
- **Image and Video Preview**: Preview uploaded videos and images before publishing.
- **Feed**: Discover and view videos from other users.
- **Profile**: View and manage user profiles with uploaded content.
- **Description**: Add a description to videos during upload.
- **Backend**: Data storage handled by Supabase, with real-time database syncing.

## Tech Stack

- **Frontend**: React Native (Expo), React Navigation
- **Backend**: Supabase (for authentication and data storage)
- **Storage**: AWS S3 (for video and image hosting)
- **Authentication**: Clerk for secure user authentication
- **Styling**: Tailwind CSS with utility-first classes
- **Iconography**: Ionicons for UI icons


## How It Works

1. **User Authentication**: Users log in with their credentials using Clerk authentication. After logging in, users can upload their videos to the platform.
![image](https://github.com/user-attachments/assets/2e7ca1a5-17d5-45dd-bd36-a00477813ce0)


2. **Uploading Media**:Users can preview their videos before publishing with a thumbnail image.
![image](https://github.com/user-attachments/assets/2b938458-e890-4cc9-a9c1-82750f03bcc7)
![image](https://github.com/user-attachments/assets/b2eb2199-4415-4e8c-aa06-321ddbd36f40)


3. **Media Display**: When users upload a video, it gets uploaded to AWS S3, and the corresponding URLs are stored in the Supabase database. Videos are displayed in the feed on the home page.
![image](https://github.com/user-attachments/assets/bc9195c7-304c-4cbe-af71-3d11cfb2b5f1)




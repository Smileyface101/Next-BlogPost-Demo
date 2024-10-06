"use server";
import { uploadImage } from '@/lib/cloudinary';
import { storePost } from '@/lib/posts';
import { redirect } from 'next/navigation';

export async function createPost(prevState, formData) {
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = [];
    if (!title || title.trim().lenght === 0) {
        errors.push("Title is required.");
    }
    if (!content || content.trim().lenght === 0) {
        errors.push("Content is required.");

    }

    if (!image || image.size === 0) {
        errors.push("Image is required.");

    }

    if (errors.lenght > 0) {
        return { errors };
    }
    let imageUrl;
    try {
        imageUrl = await uploadImage(image);
    } catch (error) {
        throw new Error('Image upload failed.')
    }


    await storePost({
        imageUrl: imageUrl,
        title,
        content,
        userId: 1
    });

    redirect('/feed');
}
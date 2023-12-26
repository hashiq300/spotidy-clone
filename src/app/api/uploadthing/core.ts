import { getServersideSession } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const imageConfig = { maxFileSize: "2MB", maxFileCount: 1 } as const

// Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    thumbnail: f({
        "image/png": imageConfig,
        "image/jpeg": imageConfig,
        "image/webp": imageConfig,
        "image/avif": imageConfig
    })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
            // This code runs on your server before upload
            const session = await getServersideSession()

            console.log("session", session?.user);

            // If you throw, the user will not be able to upload
            if (!session?.user) throw new Error("Unauthorized");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { name: session?.user.name };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for user:", metadata.name);

            console.log("file url", file.url);

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.name };
        }),
    song: f({ "audio/mpeg": { maxFileSize: "32MB", maxFileCount: 1 } })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
            // This code runs on your server before upload
            const session = await getServersideSession()

            console.log("session", session?.user);

            // If you throw, the user will not be able to upload
            if (!session?.user) throw new Error("Unauthorized");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { name: session?.user.name };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for user:", metadata.name);

            console.log("file url", file.url);

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.name };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// eslint-disable-next-line no-restricted-exports
export default buildConfig({
  collections: [
    {
      slug: "presentational",
      fields: [
        {
          fields: [
            {
              name: "testField",
              type: "text",
            },
            {
              name: "secondField",
              type: "text",
            },
          ],
          hooks: {
            // ! None of these throw
            beforeValidate: [
              () => {
                throw new Error("beforeValidate");
              },
            ],
            beforeChange: [
              () => {
                throw new Error("beforeChange");
              },
            ],
            afterChange: [
              () => {
                throw new Error("afterChange");
              },
            ],
            afterRead: [
              () => {
                throw new Error("afterRead");
              },
            ],
          },
          type: "row",
        },
      ],
    },
  ],
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // Add your own logo and icon here
    components: {
      graphics: {
        Icon: "/graphics/Icon/index.tsx#Icon",
        Logo: "/graphics/Logo/index.tsx#Logo",
      },
    },
    // Add your own meta data here
    meta: {
      description: "This is a custom meta description",
      icons: [
        {
          type: "image/png",
          rel: "icon",
          url: "/assets/favicon.svg",
        },
      ],
      openGraph: {
        description: "This is a custom OG description",
        images: [
          {
            height: 600,
            url: "/assets/ogImage.png",
            width: 800,
          },
        ],
        title: "This is a custom OG title",
      },
      titleSuffix: "- Your App Name",
    },
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  editor: lexicalEditor({}),
  graphQL: {
    schemaOutputFile: path.resolve(dirname, "generated-schema.graphql"),
  },
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});

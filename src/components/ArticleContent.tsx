// components/ArticleContent.tsx
import Image from "next/image";
import { ContentBlock } from "@/lib/api";

interface ArticleContentProps {
  blocks: ContentBlock[];
}

export function ArticleContent({ blocks }: ArticleContentProps) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p 
                key={index} 
                className="text-[19px] leading-[1.6] text-[#1d1d1f] font-normal"
              >
                {block.text}
              </p>
            );

          case "heading":
            const Tag = block.level === 2 ? "h2" : "h3";
            return (
              <Tag 
                key={index} 
                className={`font-bold tracking-tight text-[#1d1d1f] mt-12 mb-4 ${
                  block.level === 2 ? "text-3xl" : "text-2xl"
                }`}
              >
                {block.text}
              </Tag>
            );

          case "blockquote":
            return (
              <blockquote 
                key={index} 
                className="border-l-[3px] border-[#1d1d1f] pl-6 py-1 my-10"
              >
                <p className="text-2xl font-medium italic leading-snug text-[#1d1d1f]">
                  "{block.text}"
                </p>
              </blockquote>
            );

          case "unordered-list":
            return (
              <ul key={index} className="list-disc pl-6 space-y-3 my-6 text-[19px] text-[#1d1d1f]">
                {block.items.map((item, i) => (
                  <li key={i} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            );

          case "ordered-list":
            return (
              <ol key={index} className="list-decimal pl-6 space-y-3 my-6 text-[19px] text-[#1d1d1f]">
                {block.items.map((item, i) => (
                  <li key={i} className="leading-relaxed">{item}</li>
                ))}
              </ol>
            );

          case "image":
            return (
              <figure key={index} className="my-12">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#f5f5f7]">
                  <Image 
                    src={block.src} 
                    alt={block.alt} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 680px"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-4 text-center text-sm text-[#86868b] font-medium italic">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
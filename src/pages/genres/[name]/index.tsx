import { NextPage } from "next";
import { useRouter } from "next/router";
import { useGetTagInfoQuery } from "../../api/tag.api";

const GenreDetails: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;

  const { data: tag } = useGetTagInfoQuery(name as string);

  const textWithoutCredits = tag?.tag?.wiki?.content
    ?.replace(/<a.*<\/a>./g, "")
    .replace(
      "User-contributed text is available under the Creative Commons By-SA License; additional terms may apply.",
      ""
    );

  return (
    <div>
      <h1>Genre: {name}</h1>
      <h2>Description:</h2>
      <p
        dangerouslySetInnerHTML={{
          __html: textWithoutCredits,
        }}
      />
      <h2>Recommandations:</h2>
    </div>
  );
};

export default GenreDetails;
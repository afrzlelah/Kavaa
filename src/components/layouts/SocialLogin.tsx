import LoginWith from "../shared/Button/LoginWith";

export default function SocialLogin({
  platforms,
  icons,
}: {
  platforms: string[];
  icons?: React.ReactNode[];
}) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 mb-8">
      {platforms.map((platform, index) => (
        <LoginWith key={platform} name={platform} icons={icons?.[index]} />
      ))}
    </div>
  );
}

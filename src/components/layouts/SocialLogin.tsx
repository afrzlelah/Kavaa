import LoginWith from "../shared/Button/LoginWith";

export default function SocialLogin({
  platforms,
  icons,
  onSelectPlatform,
}: {
  platforms: string[];
  icons?: React.ReactNode[];
  onSelectPlatform?: (platform: string) => void;
}) {
  return (
    <div className="flex  w-full justify-around gap-2 mb-8">
      {platforms.map((platform, index) => (
        <LoginWith 
          key={platform} 
          name={platform} 
          icons={icons?.[index]} 
          onClick={() => onSelectPlatform?.(platform)}
        />
      ))}
    </div>
  );
}


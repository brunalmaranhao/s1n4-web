import { useState, useRef, useEffect } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { MdAddReaction } from "react-icons/md";
import { useTheme } from "next-themes";



const EmojiPicker = ({
  onSelectEmoji,
}: {
  onSelectEmoji: (emoji: string) => void;
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  const handleEmojiSelect = (emoji: any) => {

    onSelectEmoji(emoji.unified);
    setIsPickerOpen(false);
    console.log(emoji)
  };
  
  
  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setIsPickerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <MdAddReaction
        className="text-[#F57B00] cursor-pointer"
        onClick={() => setIsPickerOpen((prev) => !prev)}
      />
      {isPickerOpen && (
        <div ref={pickerRef} className="absolute z-50">
          <Picker
            data={data}
            locale="pt"
            theme={theme}
            onEmojiSelect={handleEmojiSelect}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;

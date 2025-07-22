import { BackgourndIcon } from "@/assets/icons/BackgroundIcon";
import img from "@/assets/images/user-grid-img14.png";
const personalInfoData = [
  { label: "Full Name", value: "Will Jonto" },
  { label: "Email", value: "willjontoax@gmail.com" },
  { label: "Phone Number", value: "(1) 2536 2561 2365" },
  { label: "Department", value: "Design" },
  { label: "Designation", value: "UI UX Designer" },
  { label: "Languages", value: "English" },
  {
    label: "Bio",
    value: "Lorem Ipsum is simply dummy text.",
  },
];

const ProfileCard = () => {
  return (
    <div className="bg-body rounded-xl shadow-lg overflow-hidden min-w-[320px]">
      <div className="relative h-40 bg-gradient-to-r from-primary via-pink-300 to-orange-300">
        <BackgourndIcon />
        <div className="absolute inset-x-0 bottom-0 flex justify-center -mb-16">
          <img
            className="w-32 h-32 rounded-full shadow-md object-cover"
            src={img}
            alt="profile image"
          />
        </div>
      </div>
      <div className="pt-20 pb-6 px-6 text-center">
        <h2 className="text-2xl font-semibold text-text">Jacob Jones</h2>
        <p className="text-secondary text-sm">ifrandom@gmail.com</p>
      </div>
      <div className="border-t border-border m-4 pt-4">
        <h3 className="text-lg font-semibold text-text mb-4">Personal Info</h3>
        <div className="space-y-3 text-text">
          {personalInfoData.map((info, index) => (
            <InfoRow key={index} label={info.label} value={info.value} />
          ))}
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex">
      <span className="font-medium text-sm text-text w-[calc(min(7rem,30%))] flex-shrink-0">
        {label}
      </span>
      <span className="text-secondary text-sm me-2">: {value}</span>
    </div>
  );
};

export default ProfileCard;

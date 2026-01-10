interface ProjectProp {
  image: string;
  name: string;
}

const projectCard = ({ image, name }: ProjectProp) => {
  return (
    <div className="bg-[#F5E662] aspect-[3/2] h-full rounded-[20px] relative text-black flex justify-center text-[30px] select-none pointer-events-none overflow-hidden">
      <label>{name}</label>
      <img
        src={image}
        alt={name}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
      />
    </div>
  );
};

export default projectCard;

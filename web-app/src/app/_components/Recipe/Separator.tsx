export default function Separator({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-5">
      <div className="flex-auto border-b-2 border-sp-primary-300"></div>
      <h2 className="font-nothing-you-could-do font-bold md:text-xl">
        {title}
      </h2>
      <div className="flex-auto border-b-2 border-sp-primary-300"></div>
    </div>
  );
}

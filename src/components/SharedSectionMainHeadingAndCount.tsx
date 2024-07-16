




interface IProps {
    headingText:string
    count:number
}
const SharedSectionMainHeadingAndCount = ({headingText,count}:IProps) => {
  return (
    <>
    <h2 className="text-xl md:text-3xl lg:text-5xl">Shop By {headingText}</h2>
    <p className=" mt-4 text-muted-foreground">
      {count} Products found
    </p>
  </>
  )
};

export default SharedSectionMainHeadingAndCount

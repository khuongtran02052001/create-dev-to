import { ReactNode } from "react";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => <div className='bg-red-200 bg-opacity-70'>
  {props.children}
</div>;

export { Main };

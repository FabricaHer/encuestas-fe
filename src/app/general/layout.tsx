import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen  flex-col   p-4">
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav className="flex  gap-2 justify-between items-center w-[100%] border-b-2 pb-4">
        <Image src={logo} alt="logo her" width={167.825} height={71.875} />

        <ul className="flex  gap-2 font-bold ">
          <li className=" rounded-sm p-1 px-2 hover:bg-primary hover:text-white duration-300 ">
            <Link href="/general">Inicio</Link>
          </li>
          <li className=" rounded-sm p-1 px-2 hover:bg-primary hover:text-white duration-300">
            <Link href="/general/format">Formatos</Link>
          </li>
          <li className=" rounded-sm p-1 px-2 hover:bg-primary hover:text-white duration-300">
            <Link href="/general/config">Configuración</Link>
          </li>
          <li className=" rounded-sm p-1 px-2 hover:bg-primary hover:text-white duration-300">
            <Link href="/general/survey">Encuestas</Link>
          </li>
          <li className=" rounded-sm p-1 px-2 hover:bg-primary hover:text-white duration-300">
            <Link href="/list">Listado</Link>
          </li>
        </ul>
      </nav>
      <div className="p-10">{children}</div>
    </section>
  );
}

"use client";

import {
  ClockAlertIcon,
  HelpCircleIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentCircleIcon,
  SearchCheckIcon,
  SettingsIcon, // Importamos o ícone
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "./sheet";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import { useRouter } from "next/navigation"; // Importamos o router

const Header = () => {
  const [open, setOpen] = useState(false);
  const { status, data } = useSession();
  const router = useRouter(); // Instância do router

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <Card className="flex justify-between p-[1.875rem] items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" onClick={() => setOpen(true)}>
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <div className="mt-2 flex flex-col gap-10">
            <div className="flex flex-col">
              {status === "authenticated" && data?.user && (
                <>
                  <div className="flex items-center gap-2 py-4">
                    <Avatar>
                      <AvatarFallback>
                        {data.user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                      {data.user.image && <AvatarImage src={data.user.image} />}
                    </Avatar>
                    <p className="font-medium">{data.user.name}</p>
                    <button
                      type="button"
                      onClick={() => router.push("/UserConfigs")}
                      className="bg-transparent hover:bg-gray-700/20 p-2 rounded-full transition"
                    >
                      <SettingsIcon size={18} />
                    </button>
                  </div>
                </>
              )}
              <Separator />
            </div>

            {status !== "authenticated" && (
              <Button
                onClick={handleLoginClick}
                variant="outline"
                className="justify-start w-full gap-3"
              >
                <LogInIcon size={16} />
                Fazer Login
              </Button>
            )}

            {status === "authenticated" && (
              <Button
                onClick={handleLogoutClick}
                variant="outline"
                className="justify-start w-full gap-3"
              >
                <LogOutIcon size={16} />
                Fazer Logout
              </Button>
            )}

            <Button variant="outline" className="justify-start w-full gap-3">
              <SearchCheckIcon size={16} />
              Mais Procurados
            </Button>
            <Button variant="outline" className="justify-start w-full gap-3">
              <PercentCircleIcon size={16} />
              Com Desconto
            </Button>
            <Button variant="outline" className="justify-start w-full gap-3">
              <ClockAlertIcon size={16} />
              Lançamentos
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="font-semibold text-lg">
        Instituto <span className="text-primary">CEA</span>
      </h1>

      <Button size="icon" variant="outline">
        <HelpCircleIcon />
      </Button>
    </Card>
  );
};

export default Header;

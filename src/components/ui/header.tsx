"use client";

import {
  ClockAlertIcon,
  HelpCircleIcon,
  LogInIcon,
  MenuIcon,
  PercentCircleIcon,
  SearchCheckIcon,
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

const Header = () => {
  const [open, setOpen] = useState(false);

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
            <Button variant="outline" className="justify-start w-full gap-3">
              <LogInIcon size={16} />
              Fazer Login
            </Button>

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

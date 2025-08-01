"use client";

import { Input } from "@call/ui/components/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@call/ui/components/input-otp";
import { Button } from "@call/ui/components/button";
import { Label } from "@call/ui/components/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Link, Hash } from "lucide-react";

export function JoinCallBox() {
  const [joinMethod, setJoinMethod] = useState<"link" | "code">("link");
  const [link, setLink] = useState("");
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleJoin = () => {
    if (joinMethod === "link" && link) {
      try {
        const url = new URL(link.startsWith("http") ? link : `https://${link}`);
        const pathParts = url.pathname.split("/").filter(Boolean);
        const callIdentifier = pathParts.pop();
        if (callIdentifier) router.push(`/app/call/${callIdentifier}`);
        else window.location.href = link;
      } catch (error) {
        window.location.href = link;
      }
    } else if (joinMethod === "code" && code.length === 6) {
      router.push(`/app/call/${code}`);
    }
  };

  const isButtonDisabled =
    (joinMethod === "link" && !link.trim()) ||
    (joinMethod === "code" && code.length !== 6);

  return (
    <div className="bg-background mx-auto mt-8 grid max-w-2xl grid-cols-1 overflow-hidden rounded-xl border shadow-lg md:grid-cols-3">
      {/* Left Panel: Information */}
      <div className="bg-muted/70 col-span-1 hidden flex-col items-center justify-center border-r p-8 text-center md:flex">
        <div className="bg-secondary/20 rounded-full p-4">
          <LogIn className="text-secondary-foreground h-10 w-10" />
        </div>
        <h2 className="mt-4 text-2xl font-bold">Join a Call</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Enter a link or code on the right to connect.
        </p>
      </div>

      {/* Right Panel: Interaction */}
      <div className="col-span-1 flex flex-col justify-center p-8 md:col-span-2">
        <div>
          <h3 className="text-foreground text-lg font-semibold">
            Connection Details
          </h3>
          <div className="mt-4 flex items-start space-x-4">
            {/* Input Area */}
            <div className="flex-grow space-y-3">
              {joinMethod === "link" && (
                <div>
                  <Label htmlFor="call-link" className="text-muted-foreground">
                    Link
                  </Label>
                  <Input
                    id="call-link"
                    placeholder="Paste your meeting link"
                    className="mt-1 h-11 text-base"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
              )}
              {joinMethod === "code" && (
                <div>
                  <Label htmlFor="call-code" className="text-muted-foreground">
                    Code
                  </Label>
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={setCode}
                    id="call-code"
                  >
                    <InputOTPGroup className="mt-1">
                      <InputOTPSlot index={0} className="h-11 w-11 text-base" />
                      <InputOTPSlot index={1} className="h-11 w-11 text-base" />
                      <InputOTPSlot index={2} className="h-11 w-11 text-base" />
                      <InputOTPSeparator />
                      <InputOTPSlot index={3} className="h-11 w-11 text-base" />
                      <InputOTPSlot index={4} className="h-11 w-11 text-base" />
                      <InputOTPSlot index={5} className="h-11 w-11 text-base" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              )}
              <Button
                className="h-11 w-full text-base font-semibold"
                onClick={handleJoin}
                disabled={isButtonDisabled}
              >
                Connect
              </Button>
            </div>

            {/* Vertical Tab Switcher */}
            <div className="flex flex-col space-y-2 border-l pl-4">
              <Button
                onClick={() => setJoinMethod("link")}
                variant={joinMethod === "link" ? "secondary" : "ghost"}
                size="icon"
                aria-label="Join with Link"
              >
                <Link className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => setJoinMethod("code")}
                variant={joinMethod === "code" ? "secondary" : "ghost"}
                size="icon"
                aria-label="Join with Code"
              >
                <Hash className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

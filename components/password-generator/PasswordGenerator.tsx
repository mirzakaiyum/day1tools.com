"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Copy, RefreshCw } from "lucide-react";
import { generate } from "random-words";

export function PasswordGeneratorComponent() {
  const [mode, setMode] = useState<"random" | "memorable">("memorable");
  const [wordCount, setWordCount] = useState(5);
  const [charLength, setCharLength] = useState(16);
  const [password, setPassword] = useState("");
  const [useLowercase, setUseLowercase] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSpecial, setUseSpecial] = useState(true);
  const [copied, setCopied] = useState(false);

  const generateMemorablePassword = () => {
    const generatedWords = generate({ exactly: wordCount, maxLength: 8 });
    return (generatedWords as string[])
      .map((word: string) => {
        const processedWord = word.charAt(0).toUpperCase() + word.slice(1);
        return `${processedWord}${Math.floor(Math.random() * 10)}`;
      })
      .join("-");
  };

  const generateRandomPassword = () => {
    let chars = "";
    if (useLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useDigits) chars += "0123456789";
    if (useSpecial) chars += "!@#$%^&*()_+";
    return Array(charLength)
      .fill(0)
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("");
  };

  const generatePassword = () => {
    const newPassword =
      mode === "memorable"
        ? generateMemorablePassword()
        : generateRandomPassword();
    setPassword(newPassword);
    setCopied(false);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  useEffect(() => {
    generatePassword();
  }, [
    mode,
    wordCount,
    charLength,
    useLowercase,
    useUppercase,
    useDigits,
    useSpecial,
  ]);

  return (
      <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center place-content-center">
        <div className="mb-4 text-center">
          <div className="text-2xl font-bold">Password Generator</div>
          <p className="text-sm text-neutral-400">
            Create a secure password quickly
          </p>
        </div>
        <Tabs defaultValue="memorable" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2 mt-2 mb-2 bg-gray-200">
            <TabsTrigger value="memorable" onClick={() => setMode("memorable")}>
              Memorable
            </TabsTrigger>
            <TabsTrigger value="random" onClick={() => setMode("random")}>
              Random
            </TabsTrigger>
          </TabsList>
          <Card className="w-full max-w-md">
            {/* <CardHeader>
          <CardTitle className="text-2xl font-bold">Generate Password</CardTitle>
          <CardDescription>Create a secure password quickly</CardDescription>
        </CardHeader> */}
            <CardContent className="space-y-6">
              <div className="space-y-2 mt-4">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="text"
                  value={password}
                  readOnly
                  className="font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button onClick={generatePassword} className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate
                </Button>
                <Button
                  onClick={copyPassword}
                  variant="outline"
                  className="w-full"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  <span className="w-12 inline-block text-left">
                    {copied ? "Copied" : "Copy"}
                  </span>
                </Button>
              </div>
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>More Options</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          {mode === "memorable"
                            ? "Number of Words"
                            : "Password Length"}
                          : {mode === "memorable" ? wordCount : charLength}
                        </label>
                        <Slider
                          min={mode === "memorable" ? 3 : 8}
                          max={mode === "memorable" ? 8 : 32}
                          step={1}
                          value={[
                            mode === "memorable" ? wordCount : charLength,
                          ]}
                          onValueChange={(value) =>
                            mode === "memorable"
                              ? setWordCount(value[0])
                              : setCharLength(value[0])
                          }
                        />
                      </div>
                      {mode === "random" && (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              Lowercase Letters
                            </span>
                            <Switch
                              checked={useLowercase}
                              onCheckedChange={setUseLowercase}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              Uppercase Letters
                            </span>
                            <Switch
                              checked={useUppercase}
                              onCheckedChange={setUseUppercase}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Digits</span>
                            <Switch
                              checked={useDigits}
                              onCheckedChange={setUseDigits}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              Special Characters
                            </span>
                            <Switch
                              checked={useSpecial}
                              onCheckedChange={setUseSpecial}
                            />
                          </div>
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </Tabs>
      </div>
  );
}

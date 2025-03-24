import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


const Buddy = () => {
    const motivationalQuote = {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
      };
    
      const studyTip = {
        title: "The Pomodoro Technique",
        content: "Break your study sessions into 25-minute focused intervals, followed by 5-minute breaks. This helps maintain concentration and prevents mental fatigue."
      };
    return (
        <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Daily Motivation</h2>
            <div className="mb-6">
              <p className="text-lg italic mb-2">{motivationalQuote.text}</p>
              <p className="text-sm text-gray-600">{motivationalQuote.author}</p>
            </div>
            <Separator className="my-4" />
            <h3 className="font-semibold mb-2">{studyTip.title}</h3>
            <p className="text-sm text-gray-600">{studyTip.content}</p>
          </Card>
    )
}

export default Buddy;
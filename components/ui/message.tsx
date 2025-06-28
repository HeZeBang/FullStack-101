import React from "react";

export interface MessageProps {
    message: string;
    sender: string;
    time: string;
    avatar: string;
}

export function Message({ message, sender, time, avatar }: MessageProps) {
    return (
        <div className="flex items-start gap-3">
            <img
                src={avatar}
                alt={sender}
                className="w-10 h-10 rounded-full border border-gray-300 object-cover"
            />
            <div>
                <div className="flex flex-col bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-2xl rounded-bl-none shadow-md max-w-xs break-words">
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">{sender}</span>
                        <span>·</span>
                    </div>
                    <div className="">{message}</div>
                    <div className="-mt-2 text-xs text-gray-500 dark:text-gray-400 self-end">
                        {time}
                    </div>
                </div>
            </div>
        </div>
    );
} 
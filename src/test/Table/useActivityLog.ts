import { useState, useCallback } from "react";

export const useActivityLog = (initialLogs: string[] = []) => {
    const [logs, setLogs] = useState<string[]>(initialLogs);

    const addLog = useCallback((...args: any[]) => {
        const time = new Date().toLocaleTimeString();

        const formattedMessage = args
            .map(arg => {
                if (typeof arg === "object" && arg !== null) {
                    try { return JSON.stringify(arg); } catch (e) { return "[Objet non sérialisable]"; }
                }
                return String(arg);
            })
            .join(" ");

        // 🔄 MODIFICATION : On ajoute le nouveau log à la FIN du tableau
        setLogs(prevLogs => [...prevLogs, `[${time}] ${formattedMessage}`]);
    }, []);

    const clearLogs = useCallback(() => setLogs([]), []);

    return { logs, addLog, clearLogs };
};
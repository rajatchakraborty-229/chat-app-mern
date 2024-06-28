import { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

function useGetMessages() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation, hasMessages } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                if (selectedConversation && selectedConversation._id) {
                    const res = await fetch(`/api/messages/${selectedConversation._id}`);
                    const data = await res.json();
                    if (data.error) {
                        if (data.error === "Conversation not found") {
                            setMessages([], false);
                        } else {
                            throw new Error(data.error);
                        }
                    } else if (data.length === 0) {
                        setMessages([], false);
                    } else {
                        setMessages(data, true);
                    }
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation) {
            getMessages();
        }

    }, [selectedConversation, setMessages]);

    return { loading, messages, hasMessages };
}

export default useGetMessages;

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Input from "./Input";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import { useDebounce } from "usehooks-ts";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type MultiSelectInputProps = {
    defaultValue?: string;
    onSelect?: (value: SearchArtist) => void;
}

type SearchArtist = {
    id: string;
    name: string;
}

function MultiSelectInput({
    defaultValue = "Select an input",
    onSelect
}: MultiSelectInputProps) {
    const timeoutRef = useRef<ReturnType<typeof global.setTimeout> | null>(null);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<SearchArtist | null>(null);
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 1000);
    const [open, setOpen] = useState(false);
    const [artists, setArtists] = useState<SearchArtist[]>([])

    const searchMutation = useMutation({
        mutationFn: async (search: string) => {
            setLoading(true)
            const res = await axios.post("/api/artist/search", { search })
            return res.data
        },
        onSuccess: (data: { artists: SearchArtist[] }) => {

            setArtists(data.artists)

            setLoading(false)
        },
        onError: (err) => {
            toast.error(err.message)
            setLoading(false)
        },
        retry: 0,
    })

    const searchArtist = useCallback(async (search: string) => {
        const found = artists.find((artist) => artist.name.toLowerCase() === search.toLowerCase())

        if (!found) {
            await searchMutation.mutateAsync(search)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        searchArtist(debouncedSearch)
    }, [debouncedSearch, searchArtist])

    const filteredOptions = useMemo(() => {
        if (search === "") return artists;
        return artists.filter((artist) => artist.name.toLowerCase().includes(search.toLowerCase()))
    }, [search, artists])

    function handleClose() {
        timeoutRef.current = setTimeout(() => {
            setSearch(selected?.name ?? "")
            setOpen(false)
            if (timeoutRef.current) {
                timeoutRef.current = null
            }
        }, 250)
    }

    function handleOpen() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
        setOpen(true)
    }

    return (
        <div
            onFocus={handleOpen}
            onBlur={handleClose}
            className="relative"
        >
            <Input
                className={twMerge(
                    "focus-visible:ring-0",
                    open && "rounded-b-none"
                )}
                placeholder={defaultValue}

                value={open ? search : selected?.name ?? ""}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setLoading(true)
                }}
            />
            {open && (
                <>
                    <div className="thin-scrollbar absolute w-full bg-neutral-800 border-2 border-neutral-300 max-h-[200px] overflow-y-auto rounded-md rounded-t-none bottom-0 translate-y-[calc(100%+3px)] min-h-12">
                        <>
                            {filteredOptions.map((option) => (
                                <button
                                    onClick={() => {
                                        setSelected(option)
                                        setSearch(option.name)
                                        setOpen(false)
                                        onSelect?.(option)
                                    }}
                                    key={option.id}
                                    className="p-2 border-b border-black block text-left hover:bg-neutral-700/60 w-full"
                                >
                                    {option.name}
                                </button>
                            ))}
                            {filteredOptions.length === 0 && (
                                <>
                                    {loading && (
                                        <div className="flex py-4 items-center justify-center h-full">
                                            <AiOutlineLoading3Quarters className="animate-spin rounded-full h-6 w-6" />
                                        </div>
                                    )}
                                    {!loading && (
                                        <div className="p-2 border-b border-black block text-left w-full">
                                            No results found
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    </div>
                </>
            )}
        </div>
    )
}

export default MultiSelectInput

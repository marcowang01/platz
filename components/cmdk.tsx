import { Command } from 'cmdk'
import React from 'react';

export default function CommandMenu() {
    const fileNames = process.env.cmdk

    const fileNamesArray = JSON.parse(JSON.stringify(fileNames))
    // console.log(fileNamesArray)

    const allPosts = fileNamesArray.map((post: String) => {
        // const component = require(`../pages/posts/${post}`)
        if (post.startsWith('_') || !post.endsWith('tsx')) return
        if (post === '/') {
            const component = require(`../pages/index.tsx`)
            return {
                link: '',
                title: component.title,
            }
        }
        const component = require(`../pages/${post}`)
        return {
            link: post.replace('.tsx', ''),
            title: component.title,
        }
    })
    const [open, setOpen] = React.useState(false)
    React.useEffect(() => {
        const downHandler = (e: any) => {
            if (e.key === 'k' && e.metaKey || e.key === 'k' && e.ctrlKey) {
                e.preventDefault();
                setOpen((open) => !open)
            } else if (e.key === 'Escape') {
                setOpen(false)
            }
        }
        window.addEventListener('keydown', downHandler)
        return () => {
            window.removeEventListener('keydown', downHandler)
        }
    }, [])
    return (
        <div className={'fixed inset-0 justify-center items-center ' + (open ? 'backdrop-blur-sm bg-neutral-200/30 z-[100]' : '-z-[100]')}>
            <Command.Dialog open={open} onOpenChange={setOpen} label="Command Menu" className={'fixed z-[100] inset-0 block w-[640px] max-w-[90vw] min-h-[300px] max-h-[40vh] justify-center m-auto bg-neutral-50 p-0 rounded-md overflow-hidden'}>
                <Command.Input autoFocus placeholder="Search for posts..." className="absolute w-full text-lg px-4 py-3 outline-none text-neutral-600 bg-neutral-200/30 rounded-none m-0 placeholder:text-gray caret-slate-300" />
                <Command.List className={'border-t-[0px] border-neutral-700 pt-0 mt-1 absolute top-12 block w-full ml-auto mr-auto overflow-y-scroll h-[85%] overscroll-contain select-none text-base text-white items-center py-2 scrollbar-none scrollbar-thumb-neutral-300 scrollbar-track-neutral-200'}>
                    <Command.Empty className='mx-[2%] px-[1%] py-4 text-center font-sans'>No results found.</Command.Empty>
                    {/* create an item for every post */}
                    {allPosts.map((post: any) => {
                        if (!post) return
                        return (
                            // todo: make not route to outside?
                        <Command.Item
                            key={post.link}
                            className='font-sans z-[99] px-[2%] h-12 flex items-center gap-3 py-4 text-neutral-600 select-none transition-all duration-150 ease-in-out relative border-l-4 border-transparent aria-selected:bg-neutral-200/30 aria-selected:border-neutral-200/30 hover:cursor-pointer'
                            onSelect={() => window.location.href = `/${post.link}`}>
                            {post.title}
                        </Command.Item>
                    )})}

                </Command.List>
            </Command.Dialog>
        </div>
    )
}
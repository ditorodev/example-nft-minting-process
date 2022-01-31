import * as React from "React"
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from '@hookform/error-message';

import { AppButton } from './AppButton';
import { nftCollectionSchema } from '../types/Collection';
import { CollectionsContext } from "../pages";
import { useCollection } from "../hooks/useCollection";

export const NFTFactoryModalTrigger = Dialog.Trigger;
export function NFTFactoryModalRoot({ children }: any) {
    return <Dialog.Root>
        <Dialog.Overlay className='bg-black opacity-30 fixed bottom-0 top-0 right-0 left-0' style={{ zIndex: 0 }} />
        {children}
    </Dialog.Root>
}


function Header() {
    return <div className="flex flex-row justify-between mb-5">
        <Dialog.Title className='text-3xl font-bold'> Crafting Table </Dialog.Title>
        <Dialog.Close> <AppButton label="Close Modal" onClick={() => { }} /></Dialog.Close>
    </div>
}

function Input(props: any, ref: any) {
    return <fieldset className="flex flex-row justify-between my-2 items-center">
        <label className="text-xl">{props.label}</label>
        <input className="w-full mx-5 border bg-slate-50 p-2 rounded-md"  ref={ref} {...props} />
    </fieldset>
}

const ForwardedInput = React.forwardRef(Input);

function Form() {
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: zodResolver(nftCollectionSchema)
    });
    const { length, pushCollection } = useCollection();
    const onSubmit = (data: any) => {
        console.log({data})
        const collection = {
            ...data, 
            collection: length + 1,
            date_of_creation: new Date().toISOString(),
        }
        pushCollection(collection);
    }

    const onError = (data: any) => {
        console.error({error: data})
    };
    return <form onSubmit={handleSubmit(onSubmit, onError)} className='mt-2'>
        <ForwardedInput label="Name" {...register("name")} />
        <ErrorMessage className="text-red-500" errors={errors} name="name" as="p" />
        <ForwardedInput label="Description" {...register("description")} />
        <ErrorMessage className="text-red-500" errors={errors} name="description" as="p" />
        <ForwardedInput type='number' label="Royalties" {...register("royalties")} />
        <ErrorMessage className="text-red-500" errors={errors} name="royalties" as="p" />
        <ForwardedInput type='number' label="Supply" {...register("supply")} />
        <ErrorMessage className="text-red-500" errors={errors} name="supply" as="p" />
        <ForwardedInput label="Picture" {...register("picture")} />
        <ErrorMessage className="text-red-500" errors={errors} name="picture" as="p" />
        <ForwardedInput label="External Link" {...register("external_link")} />
        <ErrorMessage className="text-red-500" errors={errors} name="external_link" as="p" />

        <AppButton type="submit" label="Submit" />
    </form>
}

export function NFTFactoryModalContent() {
    return (
        <Dialog.Portal>
            <Dialog.Content asChild>
                <div className="fixed flex flex-col p-10 bg-white shadow-lg rounded-2xl min-h-1/2" style={{
                    width: "90vw",
                    maxWidth: "1100px",
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <Header />
                    <hr />
                    <Form />
                </div>
            </Dialog.Content>
        </Dialog.Portal >
    )
}
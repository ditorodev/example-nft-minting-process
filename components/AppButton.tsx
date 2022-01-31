export function AppButton({ label, onClick }: AppButtonProps) {
    return <button className='bg-blue-600 text-white p-2 rounded-lg' onClick={onClick}>
        {label}
    </button>
}

type AppButtonProps = {
    label: string,
    onClick: () => any,
}
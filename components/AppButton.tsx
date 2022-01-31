export function AppButton({ label, onClick, ...rest}: AppButtonProps) {
    return <button className='bg-blue-600 text-white p-2 rounded-lg' onClick={onClick} {...rest}>
        {label}
    </button>
}

type AppButtonProps = {
    label: string,
    onClick: () => any,
} & any
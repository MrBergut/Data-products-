export default function Input({ placeholder = 'текст-подсказка', type = 'text', value, onChange, name, onBlur, onKeyDown }) {
    return (
        <div>
            <input placeholder={placeholder} onKeyDown={onKeyDown} type={type} value={value} onChange={onChange} name={name} onBlur={onBlur} />
        </div>
    )
}
export default function Input({ placeholder = 'текст-подсказка', type = 'text', value, onChange, name, onBlur }) {
    return (
        <div>
            <input placeholder={placeholder} type={type} value={value} onChange={onChange} name={name} onBlur={onBlur} />
        </div>
    )
}
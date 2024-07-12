import css from "./MovieFilter.module.css"
export default function MovieFilter({ value, onFilter, onSearch }) {
    return (
        <form  className={css.movieFilterForm} onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
            <input
                type="text"
                value={value}
                onChange={(e) => onFilter(e.target.value)} className={css.movieFilterInput}
            />
            <button type="submit" className={css.movieFilterButton}>Search</button>
        </form>
    );
}
// Shared class strings for calculator forms (plain labelled inputs with hairlines).
// Focus ring comes from the global :focus-visible rule in globals.css.
export const inputCls =
  'w-full min-h-[44px] rounded-none border-0 border-b border-ink-2 bg-transparent px-0 py-2 text-base text-ink placeholder:text-ink-2 disabled:text-ink-2 aria-[invalid=true]:border-alert'
export const labelCls = 't-label mb-1 block'
export const errCls = 'mt-1.5 text-[0.875rem] text-alert'
/** Root of a calculator client: inputs left, results right; stacks with results after inputs. */
export const calcGridCls = 'grid items-start gap-10 lg:grid-cols-[7fr_5fr] lg:gap-16'
/** Results column. */
export const resultsCls = 'min-w-0 border-t border-ink pt-6 lg:border-t-0 lg:pt-0'
/** The one big tabular figure in a result. */
export const bigFigureCls = 'num text-[clamp(2.5rem,1.8rem+3vw,3.75rem)] font-semibold leading-none tracking-[-0.03em] text-ink'
/** Small secondary buttons (copy, reset, print). */
export const miniBtnCls = 'btn btn-secondary !min-h-[44px] !px-4 !text-[0.875rem]'

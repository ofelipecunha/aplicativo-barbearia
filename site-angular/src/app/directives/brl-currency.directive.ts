import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Máscara de moeda em Real (BRL) para input: exibe R$ 12.502,50 ao digitar.
 * O valor do FormControl permanece numérico.
 */
@Directive({
  selector: 'input[brlCurrency]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrlCurrencyDirective),
      multi: true,
    },
  ],
})
export class BrlCurrencyDirective implements ControlValueAccessor {
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input')
  onInput(): void {
    const raw = this.el.nativeElement.value || '';
    const num = this.parseBrl(raw);
    this.onChange(num);
    const formatted = this.formatBrl(num);
    this.el.nativeElement.value = formatted;
    this.el.nativeElement.setSelectionRange(formatted.length, formatted.length);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
    const raw = this.el.nativeElement.value || '';
    const num = this.parseBrl(raw);
    this.el.nativeElement.value = this.formatBrl(num);
  }

  writeValue(value: number | null | undefined): void {
    const num = value != null && !Number.isNaN(value) ? Number(value) : 0;
    this.el.nativeElement.value = this.formatBrl(num);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }

  private formatBrl(value: number): string {
    if (value == null || Number.isNaN(value)) return 'R$ 0,00';
    const fixed = Math.max(0, Number(value)).toFixed(2);
    const [intPart, decPart] = fixed.split('.');
    const withDots = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `R$ ${withDots},${decPart}`;
  }

  private parseBrl(raw: string): number {
    const digits = raw.replace(/\D/g, '');
    if (digits.length === 0) return 0;
    return parseInt(digits, 10) / 100;
  }
}

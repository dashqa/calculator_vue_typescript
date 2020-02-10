import { Component, Ref } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
import { useStore } from 'vuex-simple';
import { Symbols, RefEl, Buffer, Result, Fetching } from "@/types";
import { CALC_BUTTONS } from './constants';
import Store from '@/store/store';

import * as styles from './Calculator.css?module'

@Component({
  name: 'Calculator'
})
export default class Calculator extends VueComponent {
  public store: Store = useStore(this.$store);

  @Ref("bufferRef") private bufferRef!: RefEl;
  @Ref("resultRef") private resultRef!: RefEl;

  get symbols(): Symbols {
    return CALC_BUTTONS;
  }

  get result(): Result {
    return this.store.result;
  }

  get buffer(): Buffer {
    return this.store.buffer;
  }

  get fetching(): Fetching {
    return this.store.fetching;
  }

  private changeFontSize(element: RefEl): void {
    element.style.fontSize = '100%';

    let scale = 100;
    while(element.scrollWidth > element.offsetWidth) {
      scale--;
      element.style.fontSize = scale + "%";
    }
  }

  private appendBuffer(value: string): void {
    const lastChar = this.buffer.charAt(this.buffer.length -1);
    const isNumeric = /^\d+$/.test(value);

    if (lastChar !== value || isNumeric) {
      this.store.appendBuffer(value);

      if (isNumeric) {
       this.store.setResult();
      }
    }

    this.$nextTick(() => {
      const bufferEl = this.$refs.bufferRef as RefEl;
      const resultEl = this.$refs.resultRef as RefEl;
      bufferEl.scrollLeft += bufferEl.scrollWidth;

      this.changeFontSize(resultEl);
    })
  };

  private getResult(): void {
    this.store.getResultFromServer(String(this.result));
  };

  private clear(): void {
    this.store.clear();
  }

  private handleClick({ target }: Event): void {
    // @ts-ignore
    const { symbol } = target.dataset;

    switch (symbol) {
      case 'C':
        this.clear();
        break;
      case '=':
        this.getResult();
        break;
      default:
        this.appendBuffer(symbol);
    }
  }

  render() {
    const { calculator, top, bottom, btn } = styles;

    return (
      <section class={ calculator }>
        <h1 class="hidden">Калькулятор</h1>
        <div class={ top }>
          <p ref="bufferRef">{ this.buffer }</p>
          <p ref="resultRef"> = { this.result }</p>
        </div>
        <div class={ bottom }>
          {this.symbols.map((symbol) =>
            <button
              key={ symbol }
              type="button"
              class={ btn }
              data-symbol={ symbol }
              onClick={ this.handleClick }
              disabled={ this.fetching }
            >{ symbol }</button>
          )}
      </div>
    </section>
    )
  }
}

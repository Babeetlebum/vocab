import { TestBed } from "@angular/core/testing";

import { ToneService } from "./tone.service";

describe("ToneService", () => {
  let service: ToneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToneService);
  });

  const testcases = [
    { pinyin: "nǚ ér", result: "nu3 er2" },
    { pinyin: "diǎn", result: "dian3" },
  ];
  testcases.forEach(({ pinyin, result }) => {
    it(`should convert '${pinyin}' to '${result}'`, () => {
      expect(service.convert(pinyin)).toBe(result);
    });
  });
});

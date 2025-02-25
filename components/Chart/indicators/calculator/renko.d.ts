export default function (): {
	(rawData: any[]): any[]
	options(newOptions?: any):
		| {
				reversalType: string
				windowSize: number
				fixedBrickSize: number
				sourcePath: string
		  }
		| any
	dateMutator(newDateMutator?: any): ((d: any, date: any) => void) | any
	dateAccessor(newDateAccessor?: any): ((d: any) => any) | any
}

import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useObjectRecordMultiSelectScopedStates } from '@/activities/hooks/useObjectRecordMultiSelectScopedStates';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { objectRecordMultiSelectMatchesFilterRecordsIdsComponentState } from '@/object-record/record-field/states/objectRecordMultiSelectMatchesFilterRecordsIdsComponentState';
import { useRelationPickerScopedStates } from '@/object-record/relation-picker/hooks/internal/useRelationPickerScopedStates';
import { useMultiObjectSearchMatchesSearchFilterQuery } from '@/object-record/relation-picker/hooks/useMultiObjectSearchMatchesSearchFilterQuery';
import { RelationPickerScopeInternalContext } from '@/object-record/relation-picker/scopes/scope-internal-context/RelationPickerScopeInternalContext';
import { useAvailableScopeIdOrThrow } from '@/ui/utilities/recoil-scope/scopes-internal/hooks/useAvailableScopeId';

export const ActivityTargetInlineCellEditModeMultiRecordsSearchFilterEffect =
  () => {
    const scopeId = useAvailableScopeIdOrThrow(
      RelationPickerScopeInternalContext,
    );
    const { recordMultiSelectIsLoadingState } =
      useObjectRecordMultiSelectScopedStates(scopeId);

    const setRecordMultiSelectIsLoading = useSetRecoilState(
      recordMultiSelectIsLoadingState,
    );

    const setRecordMultiSelectMatchesFilterRecords = useSetRecoilState(
      objectRecordMultiSelectMatchesFilterRecordsIdsComponentState({
        scopeId,
      }),
    );

    const relationPickerScopedId = useAvailableScopeIdOrThrow(
      RelationPickerScopeInternalContext,
    );

    const { relationPickerSearchFilterState } = useRelationPickerScopedStates({
      relationPickerScopedId,
    });
    const relationPickerSearchFilter = useRecoilValue(
      relationPickerSearchFilterState,
    );

    const {
      matchesSearchFilterObjectRecords,
      matchesSearchFilterObjectRecordsLoading: loading,
    } = useMultiObjectSearchMatchesSearchFilterQuery({
      excludedObjects: [
        CoreObjectNameSingular.Task,
        CoreObjectNameSingular.Note,
      ],
      searchFilterValue: relationPickerSearchFilter,
      limit: 10,
    });

    useEffect(() => {
      setRecordMultiSelectMatchesFilterRecords(
        matchesSearchFilterObjectRecords,
      );
    }, [
      setRecordMultiSelectMatchesFilterRecords,
      matchesSearchFilterObjectRecords,
    ]);

    useEffect(() => {
      setRecordMultiSelectIsLoading(loading);
    }, [loading, setRecordMultiSelectIsLoading]);

    return <></>;
  };
